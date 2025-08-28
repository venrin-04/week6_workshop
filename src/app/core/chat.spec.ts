import { TestBed } from '@angular/core/testing';

import { Chat } from '../features/chat/chat.component';

describe('Chat', () => {
  let service: Chat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
