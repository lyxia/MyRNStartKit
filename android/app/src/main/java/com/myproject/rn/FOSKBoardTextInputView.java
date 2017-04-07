package com.myproject.rn;

import android.content.Context;
import android.graphics.Rect;
import android.text.InputType;
import android.view.KeyEvent;

import com.facebook.react.views.textinput.ReactEditText;

/**
 * Created by hfmoney on 2017/4/5.
 * 禁掉所有的键盘显示与隐藏
 * js端通过监听onFocus来显示隐藏RN端的键盘
 * js端通过onSelectionChange来定位插入和删除的位置
 */

public class FOSKBoardTextInputView extends ReactEditText {

    private boolean mIsJSSettingFocus;

    public FOSKBoardTextInputView(Context context) {
        super(context);

        mIsJSSettingFocus = false;
    }

    @Override
    public void requestFocusFromJS() {
        mIsJSSettingFocus = true;
        requestFocus();
        mIsJSSettingFocus = false;
    }

    public boolean requestFocus(int direction, Rect previouslyFocusedRect) {
        // Always return true if we are already focused. This is used by android in certain places,
        // such as text selection.
        if (isFocused()) {
            return true;
        }
        if (!mIsJSSettingFocus) {
            return false;
        }
        setFocusableInTouchMode(true);
        boolean focused = super.requestFocus(direction, previouslyFocusedRect);
//        showSoftKeyboard();
        return focused;
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_ENTER && !isMultiline()) {
//            hideSoftKeyboard();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void clearFocus() {
        setFocusableInTouchMode(false);
        super.clearFocus();
//        hideSoftKeyboard();
    }

    private boolean isMultiline() {
        return (getInputType() & InputType.TYPE_TEXT_FLAG_MULTI_LINE) != 0;
    }
}
