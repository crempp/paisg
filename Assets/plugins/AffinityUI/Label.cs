﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;
using UnityEditor;

namespace AffinityUI
{
	/// <summary>
	/// A text label.
	/// </summary>
	public class Label : ContentControl<Label>
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="Label"/> class.
		/// </summary>
		public Label()
			: base()
		{
			Self = this;
			Style = GUI.skin.label;
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="Label"/>.
		/// </summary>
		/// <param name="text">The label text.</param>
		public Label(String text)
			: this()
		{
			SetContent(new GUIContent(text));
		}

		/// <summary>
		/// Called when layout is done using GUI.
		/// </summary>
		protected override void Layout_GUI()
		{
			GUI.Label(Position, Content, Style);
		}

		/// <summary>
		/// Called when layout is done using GUILayout.
		/// </summary>
		protected override void Layout_GUILayout()
		{
			GUILayout.Label(Content, Style, LayoutOptions);
		}

		/// <summary>
		/// Called when layout is done using EditorGUI.
		/// </summary>
		protected override void Layout_EditorGUI()
		{
			Layout_GUI();
		}

		/// <summary>
		/// Called when layout is done using EditorGUILayout.
		/// </summary>
		protected override void Layout_EditorGUILayout()
		{
			Layout_GUILayout();
		}
	}
}