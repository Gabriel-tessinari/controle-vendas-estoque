jest.mock('./src/db', () => ({
  __esModule: true,
  default: {
    query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
    connect: jest.fn().mockResolvedValue({
      query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
      release: jest.fn(),
      // mocks para transações
      begin: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
}));

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  (console.log as jest.Mock).mockRestore();
  (console.error as jest.Mock).mockRestore();
});