using UnityEngine;
using System.Collections;

public class Selector : MonoBehaviour {
	public Color selectionColor = new Color(0.329F, 0.859F, 0.376F, 0.5F);

	public static Selector selectedObject;

	//private bool selected = false;
	private Shader selectedShader;
	private Shader defaultShader;

	// Use this for initialization
	void Start () {
		selectedShader = Shader.Find("Outlined/Silhouetted Diffuse");
		defaultShader  = Shader.Find("Diffuse");
	}
	
	// Update is called once per frame
	void Update () {
		
	}

	void OnMouseDown () {
		//selected = true;
		//Debug.Log ("Planet selected");

		if (selectedObject) {
			//Debug.Log ("old selected = " + selectedObject);
			selectedObject.deselect();
		} else {
			//Debug.Log ("No previous object selected");
		}

		select ();
	}

	void select () {
		// Set selected object
		selectedObject = this;

		// Change to the selection shader
		renderer.material.shader = selectedShader;
		renderer.material.SetColor ("_OutlineColor", selectionColor);
	}

	void deselect () {
		// Change to the selection shader
		selectedObject.renderer.material.shader = defaultShader;
		//selectedObject.renderer.material.SetColor ("_OutlineColor", selectionColor);
	}

	void OnMouseEnter () {
		//Debug.Log ("mouse enter - " + gameObject.name);
	}

	void OnMouseExit  () {
		//Debug.Log ("mouse exit - " + gameObject.name);
	}
}
