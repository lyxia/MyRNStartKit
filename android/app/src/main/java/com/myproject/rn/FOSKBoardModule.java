package com.myproject.rn;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Created by hfmoney on 2017/4/5.
 */

public class FOSKBoardModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public FOSKBoardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FOSKBoard";
    }
}
