import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      all: "All",
      "chinh-tri": "Politic",
      "xa-hoi": "Society",
      "van-hoa": "Culture",
      "kinh-te": "Economy",
      "giao-duc": "Education",
      "khoa-hoc": "Science",
      "cong-nghe": "Technology",
      "y-te": "Health",
      "the-thao": "Sport",
      "giai-tri": "Entertainment",
      search: "Search",
      "created-time": "Created time",
      language: "English",
      login: "Login",
      "sign-up": "Sign up",
      "profile-page": "Profile",
      "manager-page": "Management",
      logout: "Logout",
      vietnamese: "English",
      english: "Vietnamese",
      updated: "Updated",
      time: "Zone Ha Noi",
      topic: "Topic",
      source: "Source",
      "created-post": "Created post",
      "news-everyday": "News Every Day",
      "minutes-ago": "minutes ago",
      "hours-ago": "hours ago",
      "days-ago": "days ago",
      "user-info": "User information",
      "account-name": "Account name",
      "year-of-birth": "Year of birth",
      "select-year-of-birth": "Select year of birth",
      "select-favorite-category": "Select category",
      "favourite-category": "Favorite category",
      "error-least-one-favourite-category":
        "Select at least 1 favorite category",
      "title-modal-update-info": "Update information",
      "content-modal-update-info":
        "Are you sure you want to save these changes?",
    },
  },
  vi: {
    translation: {
      all: "Tất cả",
      "chinh-tri": "Chính Trị",
      "xa-hoi": "Xã Hội",
      "van-hoa": "Văn Hoá",
      "kinh-te": "Kinh Tế",
      "giao-duc": "Giáo Dục",
      "khoa-hoc": "Khoa Học",
      "cong-nghe": "Công Nghệ",
      "y-te": "Y Tế",
      "the-thao": "Thể Thao",
      "giai-tri": "Giải Trí",
      search: "Tìm kiếm",
      "created-time": "Ngày đăng",
      language: "Tiếng Việt",
      login: "Đăng nhập",
      "sign-up": "Đăng ký",
      "profile-page": "Trang cá nhân",
      "manager-page": "Trang quản lý",
      logout: "Đăng xuất",
      vietnamese: "Tiếng Việt",
      english: "Tiếng Anh",
      updated: "Cập nhật",
      time: "Giờ Hà Nội",
      topic: "Chủ đề",
      source: "Nguồn tin",
      "created-post": "Ngày đăng bài",
      "news-everyday": "Tin tức hàng ngày",
      "minutes-ago": "phút trước",
      "hours-ago": "giờ trước",
      "days-ago": "ngày trước",
      "user-info": "Thông tin người dùng",
      "account-name": "Tên đăng nhập",
      "year-of-birth": "Năm sinh",
      "select-year-of-birth": "Chọn năm sinh",
      "select-favorite-category": "Chọn danh mục",
      "favourite-category": "Danh mục ưa thích",
      "error-least-one-favourite-category": "Chọn ít nhất 1 danh mục ưa thích",
      "title-modal-update-info": "Cập nhật thông tin",
      "content-modal-update-info": "Bạn chắc chắc muốn lưu thay đổi này?",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
