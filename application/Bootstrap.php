<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
	protected $_logger;
	/**
	 *
	 */
	protected function _initLogging()
	{
		$this->bootstrap('frontController');
		$logger = new Zend_Log();
		$writer = 'production' == $this->getEnvironment() ?
			new Zend_Log_Writer_Stream(APPLICATION_PATH
				.'/../docs/logs/app.log') :
			new Zend_Log_Writer_Firebug();
		$logger->addWriter($writer);

		if('production' == $this->getEnvironment()) {
			//     		$filter = new Zend_Log_Filter_Priority(Zend_Log::ERR);
			//     		$logger->addFilter($filter);
		}
		$this->_logger = $logger;
		Zend_Registry::set('log', $logger);
	}

	/**
	 *
	 */
	protected function _initAutoload()
	{
		$this->_logger->info('Bootstrap ' . __METHOD__);

		// Add autoloader empty namespace
		$autoLoader = Zend_Loader_Autoloader::getInstance();
		$autoLoader->registerNamespace('DD_');
		$resourceLoader = new Zend_Loader_Autoloader_Resource(array(
			'basePath' => APPLICATION_PATH,
			'namespace' => '',
			'resourceTypes' => array(
				'form' => array(
					'path' => 'forms/',
					'namespace' => 'Form_'
				),
				'model' => array(
					'path' => 'models/',
					'namespace' => 'Model_'
				)
			)
		));
		// Return it so that it can be stored by the bootstrap
		return $autoLoader;
	}

	/**
	 *
	 */
	protected function _initLocale()
	{
		$this->_logger->info('Bootstrap ' . __METHOD__);

		$locale = new Zend_Locale('en_US');
		Zend_Registry::set('Zend_Locale', $locale);
	}

	function _initDoctype()
	{
		//init the view
		$this->bootstrap('view');
		$view = $this->getResource('view');
		$view->doctype('HTML5');

		//set the layout
		$this->bootstrap('Layout');
		$layout = $this->getResource('Layout');

		//Set title and head separator
		$view->headTitle('Dev Docs')
			 ->setSeparator(' | ');

		//Load Global Stylesheets
		$view->headLink()->appendStylesheet('/styles/main/styles.css')
			->headlink()->appendStylesheet('/scripts/jquery-ui-1.8.17/themes/base/jquery-ui.css');

		//Load scripts
		$view->headScript()->prependFile('/scripts/jquery-1.7.1/jquery-1.7.1.js')
			->headScript()->appendFile('/scripts/jquery-ui-1.8.17/ui/minified/jquery-ui.min.js')
			->headScript()->appendFile('/scripts/index/scripts.js');

	}
}

