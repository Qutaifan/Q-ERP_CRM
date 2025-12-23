<?php
/* Copyright (C) 2025 Antigravity */

/**
 *  \file       htdocs/custom/qutaifancrm/core/modules/modQutaifanCRM.class.php
 *  \ingroup    qutaifancrm
 *  \brief      Description and activation file for module QutaifanCRM
 */
require_once DOL_DOCUMENT_ROOT . '/core/modules/DolibarrModules.class.php';

/**
 *  Description and activation class for module QutaifanCRM
 */
class modQutaifanCRM extends DolibarrModules
{
	/**
	 *   Constructor. Define the module properties.
	 *
	 *   @param      DoliDB		$db      Database handler
	 */
	public function __construct($db)
	{
		$this->db = $db;

		// Id for module (must be unique).
		// Use a number between 500000 and 599999 if it is a custom module.
		$this->numero = 500202;

		// Key text used to identify module (for unicity, use a key like "mymodule")
		$this->name = preg_replace('/^mod/i', '', get_class($this));

		// Module description, used if translation not found
		$this->description = "Minimalist CRM 2025 Integration for Dolibarr";

		// Possible values for version are: "experimental", "development", "last", or a version number like "v.m.a".
		$this->version = '1.0.0';

		// Key used in descriptor array to identify family of module
		$this->family = "crm";

		// Module label (no need of trans() here)
		$this->label = "Qutaifan CRM";

		// Module position for categories (10 to 50 for ERP, 100 for Others)
		$this->module_parts = array(
			'css' => array('/qutaifancrm/theme/minimalist/style.css.php'),
		);

		// Config page (if any)
		$this->config_page_url = array("admin.php@qutaifancrm");

		// Dependencies
		$this->depends = array();
		$this->required_by = array();
		$this->conflict_with = array();
		$this->phpmin = array(8, 0);

		// Data directories to create when module is enabled
		$this->dirs = array();

		// Config
		$this->const = array();

		// Menus
		$this->menu = array();
		
		// Add main menu entry
		$this->menu[$this->numero] = array(
			'fk_menu' => '0',
			'type' => 'top',
			'titre' => 'Qutaifan CRM',
			'mainmenu' => 'qutaifancrm',
			'leftmenu' => '0',
			'url' => '/custom/qutaifancrm/index.php',
			'langs' => 'qutaifancrm@qutaifancrm',
			'position' => 10,
			'enabled' => '1',
			'perms' => '1',
			'target' => '',
			'user' => '0'
		);
	}
}
