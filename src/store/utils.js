/**
 * @file store里的通用函数
 * @author jianghaoran01
 */

import {notification} from 'antd';

// 异步请求后的提示信息 - 统一处理返回数据是否包含提示信息的字段
const notificationMes = (state, mesObj, defaultMes) => {
    notification[state]({
        message: (
            mesObj && mesObj.message && mesObj.message.global
                ? mesObj.message.global
                : defaultMes
        )
    });
};

export {notificationMes};
