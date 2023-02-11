// Copyright (c) 2023, ebkar.ly and contributors
// For license information, please see license.txt



//Filtering Child table linked field based on field in the same child table 

frappe.ui.form.on("Configure To Order" ,{
	item_group_filter: function(frm) {
		frm.set_query("item_code", function() {
			return {  
				filters:[
					['item_group', '=', frm.doc.item_group_filter]
				]
			}
    
		})
	}
	}
);

frappe.ui.form.on("Configure To Order", "refresh", function(frm) {
	frm.fields_dict['cto_option_details'].grid.get_field('cto_option').get_query = function(doc, cdt, cdn) {
		var child = locals[cdt][cdn];
		//console.log(child);
		return {  
			filters:[
			['cto_type', '=', child.cto_type]
			]
		}
		}
	}
);

// Filtering On NOT Give The Same Last Name In Child Table
frappe.ui.form.on("CTO Option Table", "cto_type", function(frm) {
	frm.fields_dict['cto_option_details'].grid.get_field('cto_type').get_query = function(doc, cdt, cdn) {
		var child = locals[cdt][cdn];
		//console.log(child);
		let inList = []
		inList = frm.doc.cto_option_details.map(c =>{
			if(c.cto_type) {
				return c.cto_type;
			}
		})
		return {  
			filters:[
				['cto_type', 'not in', inList]
			]
		}
		}
	}
);
