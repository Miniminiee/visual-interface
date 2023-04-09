'''
    The RESTful style api server
'''
from pprint import pprint

from app import app
from app import dataService

import json
import numpy as np
import os
import re
import logging
import mimetypes
import subprocess

from flask import send_file, request, jsonify, render_template, send_from_directory, Response
from flask_cors import cross_origin

LOG = logging.getLogger(__name__)

MB = 1 << 20
BUFF_SIZE = 10 * MB
# ################################################################################ route
@app.route('/')
def index():
    print('main url!')
    return json.dumps('/')
    # return render_template('index.html')

@app.route('/test')
def test():
    return json.dumps('test')

# 请求数据的URL固定
@app.route('/linechart')
def _get_line_chart():
    result = dataService.get_line_chart_data() # 读取、处理数据的函数
    return json.dumps(result) # 返回json格式的数据给前端

@app.route('/stock/daily')
def _get_volume_chart():
    result = dataService.get_daily_data()
    return json.dumps(result)

# Get请求：请求数据的URL和某些变量有关，变量直接写在URL中
@app.route('/videoInfo/<video_id>') #<video_id>指将URL的这一部分赋值给video_id变量
def _get_video_info(video_id):
    result = dataService.get_video_info(video_id)
    return json.dumps(result)

if __name__ == '__main__':
    pass
