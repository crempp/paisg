using Networking;
using SimpleJSON;
using System;
using System.Collections;
using UnityEngine;

public class Client : MonoBehaviour
{

    public string host = "10.20.0.105";
    public int port = 25989;
    public int playerID = 1;

    private JSONNode state = null;

    // Use this for initialization
    void Start()
    {
        Command.RegisterCommandHandler(Command.STATUS_UPDATE, HandleStateUpdate);
        Connection.Connect(host, port, playerID);
    }

    // Update is called once per frame
    void Update()
    {
        if (null != state)
        {
            for (int j = 0; j < state["units"].Count; j++)
            {
                JSONNode unit = state["units"][j];

                //Debug.Log("HDFL");
                //Debug.Log(unit["name"]);

                GameObject unitObj = GameObject.Find(unit["name"]);
                if (unitObj)
                {
                    DroneLogic dLogic = (DroneLogic)unitObj.GetComponent(typeof(DroneLogic));
                    dLogic.setState(unit);
                }
                else
                {
                    Debug.Log("not found");
                }
            }
        }
    }

    public void HandleStateUpdate(JSONNode data)
    {
        for (int i = 0; i < data.Count; i++)
        {
            JSONNode player = data[i];

            int currPlayerID = Convert.ToInt32(player["id"]);

            if (currPlayerID == playerID)
            {
                // This is me
                state = player;
            }
        }
    }

    void OnApplicationQuit()
    {
        //client.Close();
        Connection.Disconnect();
    }
}