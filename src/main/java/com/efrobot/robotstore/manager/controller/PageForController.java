package com.efrobot.robotstore.manager.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/v1/page")
@RestController
public class PageForController {

	@RequestMapping(value = "/test")
	public String test(HttpServletRequest request) {
		request.setAttribute("navName", "结算信息-修改");
		return "test";
	}
}
