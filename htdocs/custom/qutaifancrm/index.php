<?php
/* Copyright (C) 2025 Antigravity */

/**
 *  \file       htdocs/custom/qutaifancrm/index.php
 *  \ingroup    qutaifancrm
 *  \brief      Home page of Qutaifan CRM module
 */

// Load Dolibarr environment
$res = 0;
if (!$res && file_exists("../../main.inc.php"))
    $res = @include "../../main.inc.php";					// Working directory is htdocs/custom/qutaifancrm
if (!$res && file_exists("../../../main.inc.php"))
    $res = @include "../../../main.inc.php";			// Working directory is htdocs/custom/qutaifancrm/core/modules
if (!$res)
    die("Include of main.inc.php failed");

require_once DOL_DOCUMENT_ROOT . '/core/lib/functions.lib.php';

// Load translation files
$langs->loadLangs(array("qutaifancrm@qutaifancrm", "main"));

// Access control
if (!$user->admin) {
    accessforbidden();
}

// Force dark mode
$conf->global->THEME_DARKMODEENABLED = 1;

// Find assets
// Find assets
$css_url = '';
$js_url = '';
$asset_dir = DOL_DOCUMENT_ROOT . '/custom/qutaifancrm/dist/assets/';

$css_files = glob($asset_dir . '*.css');
$js_files = glob($asset_dir . '*.js');

if ($css_files && count($css_files) > 0) {
    $css_url = DOL_URL_ROOT . '/custom/qutaifancrm/dist/assets/' . basename($css_files[0]);
}
if ($js_files && count($js_files) > 0) {
    $js_url = DOL_URL_ROOT . '/custom/qutaifancrm/dist/assets/' . basename($js_files[0]);
}

$title = "Qutaifan CRM | Minimalist 2025";

// Header
llxHeader('<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">', $title, '', '', 0, 0, array($css_url), array($js_url));

?>

<!-- React Mount Point -->
<div id="root"></div>

<script type="text/javascript">
    // Pass Dolibarr context to React if needed
    window.dolibarr = {
        user: <?php echo json_encode(array('id' => $user->id, 'login' => $user->login, 'firstname' => $user->firstname, 'lastname' => $user->lastname)); ?>,
        token: '<?php echo $_SESSION['newtoken']; ?>',
        api_url: '<?php echo DOL_MAIN_URL_ROOT; ?>/api/index.php'
    };
</script>

<?php
// Footer
llxFooter();
$db->close();
?>