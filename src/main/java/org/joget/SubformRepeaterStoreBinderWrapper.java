package org.joget;

import org.joget.apps.form.model.Element;
import org.joget.apps.form.model.FormBinder;
import org.joget.apps.form.model.FormData;
import org.joget.apps.form.model.FormRowSet;
import org.joget.apps.form.model.FormStoreBinder;

public class SubformRepeaterStoreBinderWrapper extends FormBinder implements FormStoreBinder {
    private SubformRepeater subformRepeater;
    private FormStoreBinder storeBinder;
    
    public String getName() {
        return "SubformRepeaterStoreBinderWrapper";
    }

    public String getVersion() {
        return "7.0.1";
    }

    public String getDescription() {
        return "";
    }

    public String getLabel() {
        return "Grid Inner Data Store Binder Wrapper";
    }

    public String getClassName() {
        return getClass().getName();
    }

    public String getPropertyOptions() {
        return "";
    }
    
    public SubformRepeaterStoreBinderWrapper (SubformRepeater subformRepeater, FormStoreBinder storeBinder) {
        this.subformRepeater = subformRepeater;
        this.storeBinder = storeBinder;
    }

    public FormRowSet store(Element element, FormRowSet rows, FormData formData) {
        if (rows != null && !rows.isEmpty()) {
            //store inner form/grid data
            subformRepeater.storeInnerData(rows);
        }
        
        if (rows != null) {    
            storeBinder.store(element, rows, formData);
        }
        
        if (rows != null && !rows.isEmpty()) {
            //execute addition form action for add mode equeal to show empty form on top or bottom
            subformRepeater.executeFormActionForDefaultAddForm(formData);
        }
        
        return rows;
    }
}
