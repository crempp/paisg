using Networking;
using SimpleJSON;
using System;
using System.Collections;
using UnityEngine;

namespace Networking
{
	public static class Client
	{
		public static string host = "75.72.203.25";
		//public static string host = "10.20.0.69";
		public static int port = 25989;
		public static int playerID = 1;

		private static JSONNode state = null;

		public static void Update()
	    {
	        if (null != state)
	        {   
				for (int j = 0; j < state["units"].Count; j++)
	            {
	                JSONNode unit = state["units"][j];

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

		public static void HandleStateUpdate(JSONNode data)
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

	    public static void Connect()
		{
			//Debug.Log ("Connecting to " + host);
			Command.RegisterCommandHandler(Command.STATUS_UPDATE, HandleStateUpdate);
			Connection.Connect(host, port, playerID);
		}
	}
}