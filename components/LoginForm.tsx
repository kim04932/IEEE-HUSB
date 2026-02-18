import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: () => void;
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'HAPPY_IEEE_123!@') {
      onLogin();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">관리자 비밀번호</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="password"
            className="w-full p-2.5 pl-10 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">비밀번호가 올바르지 않습니다.</p>}
      </div>
      <p className="text-xs text-gray-500">
        * 임원진 전용 로그인입니다.
      </p>
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-white transition-colors rounded-lg bg-brand-600 hover:bg-brand-700"
        >
          로그인
        </button>
      </div>
    </form>
  );
};
