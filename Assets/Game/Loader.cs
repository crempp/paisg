using UnityEngine;
using System.Collections;

public class Loader : MonoBehaviour {

	// Use this for initialization
	void Start () {
        this.BuildScreen();

        this.Print("blah");
	}
	
	// Update is called once per frame
	void Update () {
        //Debug.Log ("Planet selected");
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
        // Grab the texture
        GameObject loadList = GameObject.Find("LoadList");
        GUIText loadListText = loadList.guiText;

        loadListText.text = msg;
    }
}
