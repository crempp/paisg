using UnityEngine;
using System.Collections;
using Networking;
using AffinityUI;

public class GameManager : MonoBehaviour {

	public Texture ButtonImage;

	private Composite gui;
	private bool Option1;

	void Start () {

	}

	void Update () {
		Client.Update();
	}

	void OnGUI () {
		if (null == this.gui) {
			this.UITest();
		} else {
 			this.gui.Layout();
		}
	}

	public static void OnApplicationQuit()
	{
		Connection.Disconnect();
	}

	private void UITest() {
		gui = Composite.Create<GUILayout, Area>()
			.SetDimensions(new Rect(20, 20, 200, 200))
				.Add(new Button("A Button")
				     // This will print "A Button was clicked" on each click
				     .OnClicked(s => Debug.Log(s.Label + " was clicked"))
				     .SetImage(ButtonImage)
				     )
				.Add(new Toggle("Checkbox 1")
				     // Bind the value of the checkbox to the Option1 variable
				     .IsCheckedProperty.BindTwoWay(() => Option1, v => Option1 = v)
				     // Binding to the visible property makes this control only visible
				     // when Option1 is true, letting us show/hide it using the Toggle control below
				     .VisibleProperty.BindOneWay(() => Option1)
				     )
				.Add(new Toggle("Checkbox 2")
				     // Bind the value of the checkbox to the Option1 variable
				     .IsCheckedProperty.BindTwoWay(() => Option1, v => Option1 = v)
				     // Print to the console each time the value changes
				     .OnToggled((source, old, @new) => Debug.Log(source.Label + " is now " + @new))
				     )
				.Add(new Box().SetLabel("sadf"))
				;
	}
}
