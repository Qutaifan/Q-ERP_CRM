<?php
/**
 * Qutaifan ERP - Teams Webhook Configuration Page
 */

require '../main.inc.php';
require_once DOL_DOCUMENT_ROOT.'/core/lib/admin.lib.php';

// Security check
if (!$user->admin) {
    accessforbidden();
}

$action = GETPOST('action', 'aZ09');

// Save webhook URL
if ($action == 'update') {
    $webhookUrl = GETPOST('webhook_url', 'alpha');
    dolibarr_set_const($db, 'QUTAIFAN_TEAMS_WEBHOOK_URL', $webhookUrl, 'chaine', 0, '', 0);
    setEventMessages('Teams webhook URL saved', null, 'mesgs');
}

// Test notification
if ($action == 'test') {
    require_once DOL_DOCUMENT_ROOT.'/core/lib/teams.lib.php';
    $notifier = new TeamsNotifier();
    $result = $notifier->sendMessage(
        '✅ Test Notification',
        'Qutaifan ERP is successfully connected to Teams!',
        '28A745'
    );
    if ($result) {
        setEventMessages('Test notification sent successfully!', null, 'mesgs');
    } else {
        setEventMessages('Failed to send notification. Check webhook URL.', null, 'errors');
    }
}

llxHeader('', 'Teams Integration');

print load_fiche_titre('Microsoft Teams Integration', '', 'object_webhook');

print '<form method="post" action="'.$_SERVER['PHP_SELF'].'">';
print '<input type="hidden" name="token" value="'.newToken().'">';
print '<input type="hidden" name="action" value="update">';

print '<table class="noborder centpercent">';
print '<tr class="liste_titre">';
print '<td>Setting</td>';
print '<td>Value</td>';
print '</tr>';

print '<tr class="oddeven">';
print '<td>Teams Webhook URL</td>';
print '<td><input type="text" name="webhook_url" size="80" value="'.getDolGlobalString('QUTAIFAN_TEAMS_WEBHOOK_URL').'"></td>';
print '</tr>';

print '</table>';

print '<br>';
print '<input type="submit" class="button" value="Save">';
print '</form>';

print '<br><br>';

// Test button
print '<form method="post" action="'.$_SERVER['PHP_SELF'].'">';
print '<input type="hidden" name="token" value="'.newToken().'">';
print '<input type="hidden" name="action" value="test">';
print '<input type="submit" class="button" value="🔔 Send Test Notification">';
print '</form>';

print '<br><br>';

// Instructions
print '<div class="info">';
print '<h3>How to Get Your Teams Webhook URL:</h3>';
print '<ol>';
print '<li>Open Microsoft Teams</li>';
print '<li>Go to the channel where you want notifications</li>';
print '<li>Click "..." → "Connectors"</li>';
print '<li>Find "Incoming Webhook" → "Configure"</li>';
print '<li>Name it "Qutaifan ERP" and upload an icon</li>';
print '<li>Copy the webhook URL and paste above</li>';
print '</ol>';
print '</div>';

llxFooter();
