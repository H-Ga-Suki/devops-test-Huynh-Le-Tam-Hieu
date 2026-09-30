// Khởi tạo Supabase client dựa trên file config.js
const supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

// Hàm lấy dữ liệu từ Supabase
async function fetchMsgs() {
    let { data, error } = await supabaseClient
        .from('confessions')
        .select('*')
        .order('id', { ascending: false }); // Lấy tin nhắn mới nhất lên đầu
    
    const listEl = document.getElementById('list');

    if (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        listEl.innerHTML = `<div class="empty-text" style="color: red;">Không thể tải dữ liệu!</div>`;
        return;
    }
    
    if (data && data.length > 0) {
        listEl.innerHTML = data.map(d => `
            <li>
                <span>${escapeHtml(d.message)}</span>
                <button class="delete-btn" onclick="deleteMsg(${d.id})">Xóa</button>
            </li>
        `).join('');
    } else {
        listEl.innerHTML = `<div class="empty-text">Chưa có lời nhắn nào cả. Hãy là người đầu tiên!</div>`;
    }
}

// Hàm gửi (thêm) dữ liệu
async function sendMsg() {
    const input = document.getElementById('msgInput');
    const text = input.value.trim();
    if (text === '') return;
    
    let { error } = await supabaseClient.from('confessions').insert([{ message: text }]);
    
    if (error) {
        console.error("Lỗi gửi dữ liệu:", error);
        alert("Gửi lỗi rồi, ấn F12 chuyển qua tab Console để xem lỗi nhé!");
    } else {
        input.value = ''; 
        fetchMsgs(); 
    }
}

// Hàm xóa dữ liệu theo ID
async function deleteMsg(id) {
    if (!confirm("Bạn có chắc chắn muốn xóa lời nhắn này không?")) return;

    let { error } = await supabaseClient
        .from('confessions')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Lỗi xóa dữ liệu:", error);
        alert("Xóa thất bại!");
    } else {
        fetchMsgs();
    }
}

// Hỗ trợ nhấn phím Enter để gửi nhanh
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMsg();
    }
}

// Chống lỗi bảo mật XSS cơ bản khi hiển thị text
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Tự động tải dữ liệu lần đầu khi trang vừa mở
fetchMsgs();