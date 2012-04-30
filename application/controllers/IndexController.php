<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }

	/**
	 * NOTIFY
	 * @desc: method called via ajax to add a user to the 'let me know when this is ready' email db
	 */
	public function notifyAction()
	{
		//diasble layout for ajax freindliness
		$this->_helper->layout()->disableLayout();

		//data from the form
		$data = $_POST['email'];

		//response placeholder
		$response = '';

		$coming_soon = new Model_Email();
		$pass = $coming_soon->addEmail($data);

		if($pass)
		{
			$response = TRUE;
		} else {
			$response = FALSE;
		}

		print(json_encode($response));
	}


}

