App.view.define('main.VFacture', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.facture',
	
	x:50,
	y:50,
    height: 500,
    width: 850,
	closable: true,
	draggable: true,
	resizable: false,
	closeAction: 'destroy',
	labelWidth: 125,
	hidden: true,
	frame: false,
	title: 'Facture',
	bodyStyle:'padding:5px 5px 0',
	width: 420,
	defaults: {width: 390},
	tbar:[
	{
		text: "Téléverser",
		id: 'TFactureUploadButton',
		scale: 'medium', 
		iconCls: 'icoUpload', 
		iconAlign: 'left',
		hidden: false/*,
		handler: uploadFacturesFile*/
	},
	{
		text: "Document",
		id: 'TFactureUploadFile',
		scale: 'medium', 
		iconCls: 'icoDownload', 
		hidden: false/*,
		handler: downloadFacturesFile*/
	},	
	{
		xtype: 'panel',
		id: 'TFactureUpload',
		hidden: true,
		html: '<input type="file" id="fileToUploadF"></input>'
	}
	],
	bbar:[
	{
		xtype: 'numberfield',
		width:50,
		value: 1,
		minValue: 0,
		id: 'duplicate_number'
	},	
	{
		xtype: 'button',
		text: 'Dupliquer'/*,
		handler: factures_duplicate*/
	},
	'->',
	{ 
		text:'Annuler', 
		itemId: "Facture_close",
		formBind:true, 
		scope:this
	},
	{ 
		text: 'Supprimer', 
		id: 'TFactureDelete',
		hidden: true,
		formBind: true, 
		scope: this/*, 
		handler: myform_delete*/
	},
	{ 
		text: 'Enregistrer', 
		formBind: true, 
		hidden: true,
		id: 'TFactureRecord',
		scope: this/*, 
		handler: myform_post*/
	}
	],	  
	items: [
	{
		xtype: "panel",
		layout: "hbox",
		border: false,
		width: "100%",
		bodyStyle: 'background:transparent;',
		items: [
			{
				xtype: "label",
				text: "Etiquette:",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},
				width: 102
			},
			{
				xtype: "button",
				enableToggle: true,
				iconCls: "",
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1
			},
			{
				xtype: "button",
				enableToggle: true,
				iconCls: "",
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1
			},
			{
				xtype: "button",
				enableToggle: true,
				iconCls: "",
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1
			},
			{
				xtype: "button",
				enableToggle: true,
				iconCls: "",
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1
			},
			{
				xtype: "button",
				enableToggle: true,
				iconCls: "",
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1
			}
		]
	},
	{
		fieldLabel: 'Prestation',
		name: 'prestation',
		allowBlank: false,
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Référence',
		name: 'reference',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Code GM',
		name: 'gim',
		hidden: true,
		xtype: 'combo',
		store: new Ext.data.DirectStore({
			directFn: App.GM.getAll,
			autoLoad: true
		}),
		allowBlank: false,
		valueField: 'code',
		editable: false,
		displayField: 'code'
	},
	{
		fieldLabel: 'Etiquette',
		name: 'etiquette',
		xtype: 'colorfield',
		triggerAction: 'all',
		editable: false,
		selectOnFocus:false,			
		forceSelection:true
	},
	{
		fieldLabel: 'Echéance',
		name: 'echeance',
		format: 'Y-m-d',
		xtype: 'datefield'
	},
	{
		fieldLabel: 'Marché',
		name: 'marche',
		allowBlank: false,
		hiddenName: 'cbo_marche',
		xtype: 'combo',
		triggerAction: 'all',
		editable: false,
		selectOnFocus:false,			
		forceSelection:true, 
		mode: 'local',
		itemId: 'cbo_marche',
		store: new Ext.data.DirectStore({
			directFn: App.Marches.getAll,
			autoLoad: false
		}),
		valueField: 'ID',
		displayField: 'TITLE'
	},
	{
		fieldLabel: 'Numéro DA',
		name: 'numda',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Montant prévisionnel',
		name: 'montant_prev',
		xtype: 'numberfield'
	},
	{
		fieldLabel: 'EJ',
		name: 'ej',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'N° Facture',
		name: 'nofacture',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Montant Facture',
		name: 'montant_facture',
		xtype: 'numberfield'
	},
	{
		fieldLabel: 'Date Facture',
		name: 'date_facture',
		id: 'date_facture',
		format: 'Y-m-d',
		xtype: 'datefield'
	},
	{
		fieldLabel: 'Date Service Fait',
		name: 'date_servicefait',
		id: 'date_servicefait',
		format: 'Y-m-d',
		xtype: 'datefield'
	},
	{
		fieldLabel: 'Date Chorus',
		name: 'date_chorus',
		id: 'date_chorus',
		format: 'Y-m-d',
		xtype: 'datefield',
		hidden: true
	},
	{
		fieldLabel: 'Commentaire',
		name: 'commentaire',
		xtype: 'textarea'
	},
	{
		fieldLabel: 'Id',
		id: 'FacturesId',
		name: 'id',
		hidden: true,
		xtype: 'textfield'
	}
	]

});