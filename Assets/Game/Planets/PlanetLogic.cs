using UnityEngine;
using System.Collections;

public class PlanetLogic : MonoBehaviour {

	public Color selectionColor = new Color(0.329F, 0.859F, 0.376F, 0.5F);

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

	public void  Select () {
		// Change to the selection shader
		renderer.material.shader = selectedShader;
		renderer.material.SetColor ("_OutlineColor", selectionColor);
	}

	public void UnSelect() {
		// Change to the default shader
		renderer.material.shader = defaultShader;
	}
}
