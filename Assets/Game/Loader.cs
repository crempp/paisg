using UnityEngine;
using System.Collections;
using Networking;

public class Loader : MonoBehaviour {

	// Use this for initialization
	void Start () {
        this.BuildScreen();

		this.DoLoad();
	}

	void Update () {
        //Debug.Log ("");
	}
    
    private void OnGUI() {
        
    }

    private void BuildScreen()
    {
        // Grab the texture
        GameObject bg = GameObject.Find("Background");

        // Center texture
        bg.guiTexture.pixelInset = new Rect(Screen.width / 2, Screen.height / 2, 0, 0);
    }


    private void Print(string msg)
    {
        // Grab the text object
        GameObject loadList = GameObject.Find("LoadText");
        GUIText loadListText = loadList.guiText;

        loadListText.text = msg;
    }

	private void DoLoad()
	{
		this.Print("Connecting to server...");
		Client.Connect();

		this.Print("Checking for updates...");
		// TODO: Check server for updates, not sure how to do this.

		this.Print("Updating game state...");
		// Check game state on server and download necesary changes.

		this.Print("Done");

		Application.LoadLevel("paisg");
	}
}
