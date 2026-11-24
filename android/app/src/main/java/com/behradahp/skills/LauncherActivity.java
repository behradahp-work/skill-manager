package com.behradahp.skills;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.ComponentName;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import androidx.browser.customtabs.CustomTabsClient;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.browser.customtabs.CustomTabsServiceConnection;
import androidx.browser.customtabs.CustomTabsSession;
import androidx.browser.trusted.TrustedWebActivityIntentBuilder;

public final class LauncherActivity extends Activity {
    private final Handler handler = new Handler(Looper.getMainLooper());
    private CustomTabsServiceConnection connection;
    private String browserPackage;
    private Uri target;
    private boolean launched;
    private boolean bound;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        Uri requested = getIntent().getData();
        Uri home = Uri.parse(getString(R.string.launchUrl));
        target = requested != null
                && "https".equals(requested.getScheme())
                && home.getHost().equalsIgnoreCase(requested.getHost())
                && (requested.getPort() == -1 || requested.getPort() == 443)
                ? requested : home;

        browserPackage = CustomTabsClient.getPackageName(this, null);
        if (browserPackage == null) {
            new AlertDialog.Builder(this)
                    .setMessage(R.string.browser_required)
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> finish())
                    .setOnCancelListener(dialog -> finish())
                    .show();
            return;
        }
        connection = new CustomTabsServiceConnection() {
            @Override
            public void onCustomTabsServiceConnected(ComponentName name, CustomTabsClient client) {
                launch(client.newSession(null));
            }

            @Override
            public void onServiceDisconnected(ComponentName name) {
                launch(null);
            }
        };
        bound = CustomTabsClient.bindCustomTabsService(this, browserPackage, connection);
        if (bound) {
            handler.postDelayed(() -> launch(null), 3000);
        } else {
            launch(null);
        }
    }

    private void launch(CustomTabsSession session) {
        if (launched || isFinishing()) return;
        launched = true;
        handler.removeCallbacksAndMessages(null);
        try {
            if (session != null) {
                new TrustedWebActivityIntentBuilder(target)
                        .build(session)
                        .launchTrustedWebActivity(this);
            } else {
                CustomTabsIntent tab = new CustomTabsIntent.Builder().build();
                tab.intent.setPackage(browserPackage);
                tab.launchUrl(this, target);
            }
            finish();
        } catch (ActivityNotFoundException error) {
            new AlertDialog.Builder(this)
                    .setMessage(R.string.browser_required)
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> finish())
                    .setOnCancelListener(dialog -> finish())
                    .show();
        }
    }

    @Override
    protected void onDestroy() {
        handler.removeCallbacksAndMessages(null);
        if (bound) unbindService(connection);
        super.onDestroy();
    }
}
