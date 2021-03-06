package com.efrobot.robotstore.manager.service;

import java.util.List;
import com.efrobot.robotstore.baseapi.manager.pojo.SysUser;

public interface SysUserService {
//	/**
//	 * @方法名: selectByParams
//	 * @功能描述: 查询用户列表
//	 * @param record
//	 * @return List<SysUser>
//	 * @作者 wangxx
//	 * @日期 2016年7月13日15:08:49
//	 */
//	List<SysUser> selectByParams(SysUser record) throws Exception;

	int insertSelective(SysUser record) throws Exception;
	
	int updateByPrimaryKeySelective(SysUser record)throws Exception;
//	/**
//	 * 
//	 * @方法名: deleteByPrimaryKey  
//	 * @功能描述: 删除用户
//	 * @param userId
//	 * @return
//	 * @throws Exception
//	 * @作者 wangxiangxiang
//	 * @日期 2016年7月13日
//	 */
//	 int deleteByPrimaryKey(Integer userId) throws Exception;
//	 /**
//	  * 
	 SysUser selectByPrimaryKey(Integer userId) throws Exception;
}