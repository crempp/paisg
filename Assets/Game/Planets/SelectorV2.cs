using UnityEngine;
using System.Collections;

public class SelectorV2 : MonoBehaviour {
	private Vector3 targetPosition;
	private Vector3 directionVector;
	private Camera mainCamera;

	private PlanetLogic selectedPlanetLogic = null;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {

		// Left Click - Select
		if (Input.GetMouseButtonDown (0))
		{
			// We have a click, first un-select any selected object
			if (selectedPlanetLogic) {
				selectedPlanetLogic.UnSelect();
			}
			selectedPlanetLogic = null;

			mainCamera = FindCamera();

			// We need to actually hit an object
			RaycastHit hit;
			if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  out hit)) {
				return;
			}
				

			// We need to hit something (with a collider on it)
			if (!hit.transform) {
				return;
			}

			switch (hit.transform.gameObject.tag)
			{
				case "planet":
					selectedPlanetLogic = hit.transform.GetComponent<PlanetLogic>();
					selectedPlanetLogic.Select();
					break;
				case "star":
					//selectedPlanetLogic = hit.transform.GetComponent<PlanetLogic>();
					//selectedPlanetLogic.Select();
					break;
				case "ship":
					//selectedPlanetLogic = hit.transform.GetComponent<PlanetLogic>();
					//selectedPlanetLogic.Select();
					break;
			}

		}
	}

	Camera FindCamera ()
	{
		if (camera)
			return camera;
		else
			return Camera.main;
	}
}
