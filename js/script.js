document.getElementById('jingjiaoBox').addEventListener('click', function() {
    const fileInput = document.getElementById('jingjiaoUpload');
    console.log("触发了文件上传点击事件");
    fileInput.click();  // 触发文件选择框
});
// 确保 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('jingjiaoUpload');
    if (fileInput) {
        console.log("input 元素已经加载:", fileInput);
    } else {
        console.log("input 元素未加载或找不到");
    }
});
// 触发文件选择框
function triggerFileInput(inputId) {
    const fileInput = document.getElementById(inputId);
    fileInput.click();  // 触发文件选择框
}

// 处理文件选择和预览
function handleFileSelect(event, previewContainerId) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewContainer = document.getElementById(previewContainerId);
            previewContainer.innerHTML = '';  // 清空之前的预览内容

            // 创建新的图片元素并插入预览区域
            const img = document.createElement('img');
            img.src = e.target.result;
            previewContainer.appendChild(img);  // 插入新图片
        };
        reader.readAsDataURL(file);
    }
}

// 处理按钮点击事件的函数
function handleButtonClick() {
    console.log("按钮点击了");
    const fileInput = document.getElementById('jingjiaoUpload');
    if (fileInput) {
        console.log("找到了文件输入框");
        getParameters('jingjiaoBox');
        submitJingjiao('jingjiaoUpload');
    } else {
        console.log("找不到文件输入框");
    }
}


// 获取参数的函数
function getParameters(boxId) {
    // 通过boxId获取对应的容器元素
    const container = document.getElementById(boxId);

    if (container) {
        console.log(`获取 ${boxId} 的参数`);
        // 你可以在这里添加获取容器中图片路径或其他逻辑
    } else {
        console.error(`找不到ID为 ${boxId} 的容器`);
    }
}

// 提交图片的函数
function submitJingjiao() {
    const fileInput = document.getElementById('jingjiaoUpload');

    // 调试：查看是否找到了文件输入框
    if (!fileInput) {
        console.error("未找到文件输入框（jingjiaoUpload）");
        return false;
    }

    if (fileInput.files.length === 0) {
        alert("请先选择需要分析的图片");
        return false; // 阻止空提交
    }

    // 获取文件并构建 FormData
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);


    // 发送请求到 Flask 后端
    fetch('/submit_jingjiao', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("参数获取结果:", data);
        if (data.success) {
            alert("参数获取成功！");
            // 在这里调用 displayResult()，并传入 output_json 数据
            displayResult(data.output_json);  // 显示分析结果
        } else {
            alert("参数获取失败：" + data.error);
        }
    })
    .catch(error => {
        console.error("参数获取失败:", error);
        alert("参数获取失败，请检查控制台");
    });
}

//折叠
        document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.clickable-header').forEach(header => {
            header.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                const section = header.parentElement;
                const content = header.nextElementSibling;
                section.classList.toggle('collapsed');
                content.style.maxHeight = section.classList.contains('collapsed') ? '0' : content.scrollHeight + 'px';
            });
        });

        // 图片预览函数
        window.previewImage = function(event, containerId) {
            const reader = new FileReader();
            const files = event.target.files;

            if(files && files[0]) {
                reader.onload = function(e) {
                    const container = document.getElementById(containerId);
                    container.innerHTML = `<img src="${e.target.result}" style="max-width:100%; max-height:180px;">`;
                }
                reader.readAsDataURL(files[0]);
            }
        };

        // 参数获取函数（示例）
        window.getParameters = function(boxId) {
            console.log(`获取 ${boxId} 的参数...`);
            // 实际逻辑实现
        };
    });

// 显示分析结果
function displayResult(jsonData) {
    const resultBody = document.getElementById('resultBody');
    const resultTable = document.querySelector('.result-table');
    resultTable.style.display = 'table'; // 显示结果表格

    // 清空当前的结果
    resultBody.innerHTML = '';

    // 定义存储每个位置的数据
    const positionData = {
        left: {
            color: '',
            shape: '',
            height: '',
            width: ''
        },
        mid: {
            color: '',
            shape: '',
            height: '',
            width: ''
        },
        right: {
            color: '',
            shape: '',
            height: '',
            width: ''
        }
    };

    // 确保 jsonData 是有效的并且包含数据
    if (jsonData && Array.isArray(jsonData)) {
        // 遍历每个数据项并存储到相应的位置
        jsonData.forEach(item => {
            if (item.JingjiaoPosition === 'left') {
                positionData.left.color = item.Color !== '无数据' ? item.Color : '';
                positionData.left.shape = item.Shape !== '无数据' ? item.Shape : '';
                if (item.Heights && item.Heights.length > 0 && item.Heights[0] !== '无数据') {
                    positionData.left.height = formatNumber(item.Heights[0]);
                }
                if (item.Widths && item.Widths.length > 0 && item.Widths[0] !== '无数据') {
                    positionData.left.width = formatNumber(item.Widths[0]);
                }
            } else if (item.JingjiaoPosition === 'mid') {
                positionData.mid.color = item.Color !== '无数据' ? item.Color : '';
                positionData.mid.shape = item.Shape !== '无数据' ? item.Shape : '';
                if (item.Heights && item.Heights.length > 0 && item.Heights[0] !== '无数据') {
                    positionData.mid.height = formatNumber(item.Heights[0]);
                }
                if (item.Widths && item.Widths.length > 0 && item.Widths[0] !== '无数据') {
                    positionData.mid.width = formatNumber(item.Widths[0]);
                }
            } else if (item.JingjiaoPosition === 'right') {
                positionData.right.color = item.Color !== '无数据' ? item.Color : '';
                positionData.right.shape = item.Shape !== '无数据' ? item.Shape : '';
                if (item.Heights && item.Heights.length > 0 && item.Heights[0] !== '无数据') {
                    positionData.right.height = formatNumber(item.Heights[0]);
                }
                if (item.Widths && item.Widths.length > 0 && item.Widths[0] !== '无数据') {
                    positionData.right.width = formatNumber(item.Widths[0]);
                }
            }
        });

        // 为每个位置插入一行数据
        ['left', 'mid', 'right'].forEach(position => {
            const row = document.createElement('tr');

            // 设置位置单元格
            const positionCell = document.createElement('td');
            positionCell.textContent = position;
            row.appendChild(positionCell);

            // 设置其他数据单元格
            const colorCell = document.createElement('td');
            colorCell.textContent = positionData[position].color || '';
            row.appendChild(colorCell);

            const shapeCell = document.createElement('td');
            shapeCell.textContent = positionData[position].shape || '';
            row.appendChild(shapeCell);

            const heightCell = document.createElement('td');
            heightCell.textContent = positionData[position].height || '';
            row.appendChild(heightCell);

            const widthCell = document.createElement('td');
            widthCell.textContent = positionData[position].width || '';
            row.appendChild(widthCell);

            // 将行添加到表格
            resultBody.appendChild(row);
        });

    } else {
        console.error("Invalid or empty JSON data:", jsonData);
        alert("分析结果无效或为空");
    }
}

// 格式化数字，保留两位小数
function formatNumber(value) {
    if (typeof value === 'number' || !isNaN(value)) {
        return parseFloat(value).toFixed(2);  // 保留两位小数
    }
    return value;
}

async function fetchParams() {
  // 显示加载动画
  document.getElementById('loader').style.display = 'flex';

  try {
    // 替换为实际API调用
    const response = await fetch('/submit_jingjiao');
    const data = await response.json();

    // 关闭加载动画
    document.getElementById('loader').style.display = 'none';

    // 显示结果弹窗
    document.querySelector('.result-modal').style.display = 'block';
    // 更新弹窗内容...

  } catch (error) {
    document.getElementById('loader').style.display = 'none';
    alert('数据获取失败');
  }
}

// 绑定点击事件
document.getElementById('param-button').addEventListener('click', fetchParams);
