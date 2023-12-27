const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
import MessageList from '../../components/dashboard/Messages/MessageList'

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe("Test SocketIO", () => {
  jest.mock("socket.io-client", () => {
    const emit = jest.fn();
    const on = jest.fn();
    const socket = { emit, on };
    return jest.fn(() => socket);
  });

  beforeEach(() => {
    wrapper = shallow(<MessageList />);
    setState = jest.fn();
    useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(init => [init, setState]);
  });

  afterEach(() => jest.clearAllMocks());

  it("connect to socket.io server", () => {
    expect(io).toHaveBeenCalledWith("http://localhost:3001");
  });
  /*let io, serverSocket, clientSocket;

  beforeAll((done) => {
     const httpServer = createServer();
    io = new Server(httpServer); 
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
    serverSocket.emit("hello", "world");
  });

  test("should work (with ack)", (done) => {
    serverSocket.on("hi", (cb) => {
      cb("hola");
    });
    clientSocket.emit("hi", (arg) => {
      expect(arg).toBe("hola");
      done();
    });
  }); */
});