// Copyright (c) 2023, ebkar.ly and contributors
// For license information, please see license.txt

frappe.ui.form.on('Installment Request', {
	refresh: function(frm) {
		frm.set_query('price_list', function(){
			return {
				filters: {
					selling: 1
				}
			}
		})
	},
	price_list: async function(frm) {
		for(let i = 0; i < frm.doc.installment_request_table.length; i++) {
			let row = frm.doc.installment_request_table[i];

			let data = await frappe.call(
				{
					method: "frappe.client.get_value",
					args: {
						doctype: "Item Price",
						fieldname: "price_list_rate",
						filters: {
							price_list: frm.doc.price_list,
							item_code:	row.item_code
						}
					},
					async: true
				}
			)

			if(data.message) {
				
				row.rate = data.message.price_list_rate;

				row.amount = row.qty * row.rate

			}
		}
		frm.refresh_fields()
	},
});

frappe.ui.form.on('Installment Request Table', {
	item_code: function(frm, cdt, cdn){
		let d = locals[cdt][cdn]
		frappe.call(
			{
				method: "frappe.client.get_value",
				args: {
					doctype: "Item Price",
					fieldname: "price_list_rate",
					filters: {
						price_list: frm.doc.price_list,
						item_code: d.item_code
					}
				},
				callback: function(r) {
					let data = r.message;
					if(data) {
						d.rate = data.price_list_rate
						
					}

					frm.refresh_fields()
				}
			}
		)
	},
	qty: function(frm, cdt, cdn) {
		let d = locals[cdt][cdn]
		frappe.call(
			{
				method: "frappe.client.get_value",
				args: {
					doctype: "Item Price",
					fieldname: "price_list_rate",
					filters: {
						price_list: frm.doc.price_list,
						item_code: d.item_code
					}
				},
				callback: function(r) {
					let data = r.message;
					if(data) {
						d.rate = data.price_list_rate

						let total_amount = d.qty * d.rate
						d.amount = total_amount;
						
					}

					frm.refresh_fields()
				}
			}
		)


		frm.refresh_fields()
	}
});	