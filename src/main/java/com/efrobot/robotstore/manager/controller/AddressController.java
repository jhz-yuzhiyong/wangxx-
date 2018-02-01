package com.efrobot.robotstore.manager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.efrobot.robotstore.baseapi.manager.pojo.Address;
import com.efrobot.robotstore.manager.service.AddressService;
import com.efrobot.robotstore.util.CommonUtil;

@RequestMapping("/v1/address")
@RestController
public class AddressController {
	@Autowired
	private AddressService addressService;
	
	
	@RequestMapping(value = "/insertAddress", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> insertAddress(Address record) throws Exception {
		int result = -1;
		List<Address> list=addressService.getAddress(record);
		if(list.size()==0){
			record.setStatus(1);
		}else{
			record.setStatus(0);
		}
		result = addressService.insertSelective(record);
		if (result == 0) {
			return CommonUtil.resultMsg("FAIL", "未找到可编辑的信息");
		} else if (result == 1)
			return CommonUtil.resultMsg("SUCCESS", "信息插入功");
		else {
			return CommonUtil.resultMsg("FAIL", "更新异常: 多条数据被更新 ");
		}
	}
	
	@RequestMapping(value = "/updateAddress", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateAddress(Address record ) throws Exception {
		int result = -1;
		result = addressService.updateByPrimaryKey(record);
		if (result == 0) {
			return CommonUtil.resultMsg("FAIL", "未找到可编辑的信息");
		} else if (result == 1)
			return CommonUtil.resultMsg("SUCCESS", "编辑信息成功");
		else {
			return CommonUtil.resultMsg("FAIL", "更新异常: 多条数据被更新 ");
		}
	}
	@RequestMapping(value = "/updateAddressStatus", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateAddressStatus(Address record) throws Exception {
		int result = -1;
		record.setStatus(0);
		result = addressService.updateAddressStatus(record);
		record.setStatus(1);
		result = addressService.updateByPrimaryKeySelective(record);
		if (result == 0) {
			return CommonUtil.resultMsg("FAIL", "未找到可编辑的信息");
		} else if (result == 1)
			return CommonUtil.resultMsg("SUCCESS", "编辑信息成功");
		else {
			return CommonUtil.resultMsg("FAIL", "更新异常: 多条数据被更新 ");
		}
	}
	@RequestMapping(value = "/deletAddress")
	@ResponseBody
	public Map<String, Object> deletAddress(Integer id) throws Exception {
		int result = -1;
		result = addressService.deleteByPrimaryKey(id);
		if (result == 0) {
			return CommonUtil.resultMsg("FAIL", "未找到可编辑的生产信息");
		} else if (result == 1)
			return CommonUtil.resultMsg("SUCCESS", "编辑生产信息成功");
		else {
			return CommonUtil.resultMsg("FAIL", "更新异常: 多条数据被更新 ");
		}
	}
}