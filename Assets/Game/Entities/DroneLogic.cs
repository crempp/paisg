using UnityEngine;
using SimpleJSON;
using System;
using System.Collections;

public class DroneLogic : MonoBehaviour {
    /* 
     * {"name":"drone-1", 
     *  "type":"drone", 
     *  "module":"e144e80279de530b994e4f60d5b4aff8", 
     *  "moi":"1", 
     *  "thrust":"0.6427876096865368", 
     *  "torque":"0.6427876096865368", 
     *  "heading":"0.005390077455661273", 
     *  "position":{"x":"49.5378387934126", "y":"-2212.1608743296442"},
     *  "velocity":{"x":"0.02599228940265372", "y":"-1.159221487364964"}}
     */
    private JSONNode state = null;
	
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
        if (null != state)
        {
            float x = Convert.ToSingle(state["position"]["x"]);
            float z = Convert.ToSingle(state["position"]["y"]);
            float r = (float)(Convert.ToDouble(state["heading"]) * (180 / Math.PI));

            Vector3 newPos = new Vector3(x, 0, z);

            //Debug.Log(newPos);

            transform.position = newPos;
            transform.Rotate(0, r, 0);
        }
	}

    public void setState(JSONNode data)
    {
        state = data;
    }
}
