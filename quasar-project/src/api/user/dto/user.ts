export interface CreateUserDto {
  name: string;
  email: string;
}

export interface FetchUserDto {
  id: number;
  name: string;
  email: string;
}

// ParamError 타입 정의
export interface ParamError {
field: string;  // 문제가 있는 필드 이름
value: any;     // 해당 필드의 값
reason: string; // 오류 이유
}

// ApiResponse 타입 정의 (제네릭 사용)
export interface ApiResponse<T> {
timestamp: string;         // 응답 타임스탬프
txId: string;              // 트랜잭션 ID
error?: string;            // 에러 메시지 (Optional)
message?: string;          // 추가 메시지 (Optional)
data?: T;                  // 실제 데이터 (Optional)
paramErrors?: ParamError[]; // 입력값 에러 목록 (Optional)
}
