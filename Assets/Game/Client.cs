using UnityEngine;
using System.Collections;
using System.Net.Sockets;
using System.Text;

public class Client : MonoBehaviour {

    static private string host = "10.20.0.106";
    static private int port = 25989;

	// Use this for initialization
	void Start () {
        Blah();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
    static void Blah()
    {
        TcpClient tcpClient = new TcpClient();
        tcpClient.Connect(host, port);
        NetworkStream clientStream = tcpClient.GetStream();

        byte[] message = new byte[4096];
        int bytesRead;
        bytesRead = 0;

        try
        {
            // Read up to 4096 bytes
            bytesRead = clientStream.Read(message, 0, 4096);
        }
        catch
        { 
            /*a socket error has occured*/ 
        }

        //We have read the message.
        ASCIIEncoding encoder = new ASCIIEncoding();
        //Console.WriteLine(encoder.GetString(message, 0, bytesRead));
        Debug.Log(encoder.GetString(message, 0, bytesRead));

        tcpClient.Close();
    }
}
