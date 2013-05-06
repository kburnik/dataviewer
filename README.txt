
*******************************************************************************************

Dataviewer - a jQuery plugin by Kristijan Burnik

*******************************************************************************************


This are changes logged while working without version control (sadly there was a time...)

--------------------------------------------------------------------------------------------

Debugging and CHANGE LOG

 * 2.2 :: 15:56 23.6.2011.
	- autoWidth :: fields marked with autoWidth make their cell stretched to content
	- label :: determines if a field displays like a label (e.g. for Property-Value pairs)
	- align :: determines alignment of field: align:{fieldName:alignType} where alignType is from ['left','center','right']
	- labelCheckbox :: boolean / determines if the CheckBox acts like label (gray bg)
	- purified and changed CSS : Font is Tahoma now
	- changed Dragger image
	- changed refresh and loading indicator image
	- changed order of status bar elements
	- new status bar text format
	- new scrollbar design
	- operations field and checkbox field both now have autoWidth property set
	- allowed entering a larger number than total record number into "View limit" field // still needs fixing (limit not consistent when adding data)
	- debugged inlineEditable span dimensions (annoying click only in text feature)

 * 2.1 :: 17:04 22.2.2011.
	- uniqueToggler :: added field constructor for radio button
	- Added "additional" param for updateField function, determines update context (e.g. preoperations...)
	- Modified $.fn.construct function :: added objectKeySuffix used for passing an INSTANCE ID for grouping objects in DATA GRID
	  such as radiobuttons (since the name determines the group)
	 
 

 * 2.0 :: 0:14 9.12.2010. :: 
	- inlineEditable :: added TAB && SHIFT TAB functionality to switch between cell's. 
	- added KEYEVENTS MAP BETA to track key states
	- added inlineEditable checking of update, no ajax update is called if value doesn't change :: bandwith_saving++ :-)
	   

 * 1.9 :: 17:44 5.11.2010. 
	- Baloon/FieldConstructor contentEditable fix 
	- default display and hide events change to "mousenter" and "mouseleave". 

 * 1.8 :: BugFix with search implementation