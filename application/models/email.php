<?php

class Model_Email extends Zend_Db_Table_Abstract {

	protected $_name = 'email_list';

	public function addEmail($email)
	{
		$row = $this->createRow();

		if($row)
		{
			$row->email = $email;
			$row->date = Zend_Date::now()->toString('yyyyMMddHHmmss');
			$row->save();
		}

		$id = $row->id;
		return $id;
	}
}