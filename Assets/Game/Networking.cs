using SimpleJSON;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using UnityEngine;

namespace Networking
{
    /// <summary>
    /// State object for receiving data from remote device.
    /// </summary>
    public class StateObject
    {
        // Client socket.
        public TcpClient workSocket = null;
        // Size of receive buffer.
        public const int BufferSize = 256;
        // Receive buffer.
        public byte[] buffer = new byte[BufferSize];
        // Received data string.
        public StringBuilder sb = new StringBuilder();
    }

    public static class Command
    {
        public const string STATUS_UPDATE = "stateupdate";

        public delegate void CommandDelegate(JSONNode data);

        private static Dictionary<string, CommandDelegate> handlers = new Dictionary<string, CommandDelegate>();

        public static void RegisterCommandHandler(string command, CommandDelegate handler)
        {
            try
            {
                handlers.Add(command, handler);
            }
            catch (ArgumentException)
            {
                Debug.Log("An element with Key = " + command + " already exists.");
            }
        }

        public static void HandleCommand(string command, JSONNode data)
        {
            handlers[command](data);
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public static class Connection
    {
        const string EOF = "\r\n";

        private static string NetIP;
        private static int NetPort;
        private static int PlayerID;

        private static TcpClient client;

        

        /// <summary>
        /// Connect to the server
        /// </summary>
        /// <param name="netIP"></param>
        /// <param name="netPort"></param>
        /// <param name="playerID"></param>
        /// <returns></returns>
        public static bool Connect(string netIP, int netPort, int playerID)
        {
            NetIP = netIP;
            NetPort = netPort;
            PlayerID = playerID;

            client = new TcpClient();
            client.Connect(NetIP, NetPort);

            Receive(client);

            return true;
        }

        /// <summary>
        /// Disconnect from the server
        /// </summary>
        /// <returns></returns>
        public static bool Disconnect()
        {
            // TODO: send disconnect
            client.Close();
            return true;
        }

        /// <summary>
        /// Start the receive state
        /// </summary>
        /// <param name="client"></param>
        private static void Receive(TcpClient client)
        {
            try
            {
                // Create the state object.
                StateObject state = new StateObject();
                state.workSocket = client;

                NetworkStream clientStream = client.GetStream();
                clientStream.BeginRead(state.buffer, 0, StateObject.BufferSize,
                    new AsyncCallback(ReceiveCallback), state);
            }
            catch (Exception e)
            {
                Debug.Log(e.ToString());
            }
        }

        /// <summary>
        /// Callback method for a data fragment from the server
        /// </summary>
        /// <param name="ar"></param>
        private static void ReceiveCallback(IAsyncResult ar)
        {
            int bytesRead;
            try
            {
                // Retrieve the state object and the client socket 
                // from the asynchronous state object.
                StateObject state = (StateObject)ar.AsyncState;
                TcpClient stateClient = state.workSocket;

                // Finish asynchronous read into readBuffer and return number of bytes read.
                bytesRead = stateClient.GetStream().EndRead(ar);

                if (bytesRead > 0)
                {
                    // There might be more data, so store the data received so far.
                    string str = Encoding.ASCII.GetString(state.buffer, 0, bytesRead);
                    
                    // Add message fragment to state buffer
                    state.sb.Append(str);

                    // Check if we received the EOF characters
                    if (str.IndexOf(EOF) > -1)
                    {
                        // Handle completed message
                        HandleComplete(state);
                        
                        // Start next receive
                        Receive(stateClient);
                    }
                    else
                    {
                        // Get the rest of the data.
                        NetworkStream clientStream = client.GetStream();
                        clientStream.BeginRead(state.buffer, 0, StateObject.BufferSize,
                            new AsyncCallback(ReceiveCallback), state);
                    }
                }
                else
                {
                    // Handle completed message
                    HandleComplete(state);

                    // Start next receive
                    Receive(stateClient);
                }
            }
            catch (Exception ex)
            {
                Debug.Log("had a problem : " + ex.ToString());
            }
        }

        /// <summary>
        /// Handle a complete message received from the server
        /// </summary>
        /// <param name="state"></param>
        private static void HandleComplete(StateObject state)
        {
            string message = "";

            // Extract full message
            if (state.sb.Length > 1)
            {
                message = state.sb.ToString();
            }

            JSONNode messageObj = JSON.Parse(message);

            string command = messageObj["cmd"];
            JSONNode data = messageObj["data"];

            Command.HandleCommand(command, data);
        }
    }

}