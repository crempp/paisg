using UnityEngine;
using System.Collections;

public class PlanetaryRotation : MonoBehaviour {

	public float daySpeed = 3;
	public float yearSpeed = 3;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		// Planet spin (day)
		transform.Rotate(0, daySpeed * Time.deltaTime, 0);

		// Planet rotation around star (year)
		transform.RotateAround(transform.parent.position, Vector3.up, yearSpeed * Time.deltaTime);
	}
}
