package com.myproject.rn;

import android.os.Build;
import android.text.InputType;
import android.widget.EditText;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.textinput.ReactEditText;
import com.facebook.react.views.textinput.ReactTextInputManager;

import java.lang.reflect.Method;

/**
 * Created by hfmoney on 2017/4/5.
 */

public class FOSKBoardManager extends ReactTextInputManager {
    protected static final String REACT_CLASS = "FOSKBoardTextInput";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public ReactEditText createViewInstance(ThemedReactContext context) {
        ReactEditText editText = super.createViewInstance(context);
        hideSystemSoftKeyboard(editText);
        return editText;
    }

    public static void hideSystemSoftKeyboard(EditText editText) {
        int sdkInt = Build.VERSION.SDK_INT;
        if (sdkInt >= 11) {
            try {
                Class<EditText> cls = EditText.class;
                Method setShowSoftInputOnFocus;
                setShowSoftInputOnFocus = cls.getMethod("setShowSoftInputOnFocus", boolean.class);
                setShowSoftInputOnFocus.setAccessible(true);
                setShowSoftInputOnFocus.invoke(editText, false);
            } catch (SecurityException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            editText.setInputType(InputType.TYPE_NULL);
        }
    }
}
