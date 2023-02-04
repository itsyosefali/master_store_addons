import frappe

def on_save(doc,method):
    total =   0
    for item in doc.installment_request_table:
        total += item.amount    
    doc.total_amount = total