import {
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Buses from './index';

const mockData = {
  data: {
    stop: {
      name: "Energia-aukio",
      stoptimesWithoutPatterns: [
        {
          trip: {
            "id": "VHJpcDpIU0w6MTAxNV8yMDIyMTEwN19UaV8yXzE0NTM=",
            "route": {
              "shortName": "15"
            }
          },
          "realtimeArrival": 53505,
          "arrivalDelay": -75
        },
        {
          trip: {
            "id": "VHJpcDpIU0w6MTAxNV8yMDIyMTEwN19UaV8yXzE1MDE=",
            "route": {
              "shortName": "15"
            }
          },
          "realtimeArrival": 54060,
          "arrivalDelay": 0
        },
        {
          trip: {
            "id": "VHJpcDpIU0w6MTAxNV8yMDIyMTEwN19UaV8yXzE1MDk=",
            "route": {
              "shortName": "15"
            }
          },
          "realtimeArrival": 54540,
          "arrivalDelay": 0
        },
        {
          trip: {
            "id": "VHJpcDpIU0w6MTAxNV8yMDIyMTEwN19UaV8yXzE1MTc=",
            "route": {
              "shortName": "15"
            }
          },
          "realtimeArrival": 55020,
          "arrivalDelay": 0
        },
        {
          trip: {
            "id": "VHJpcDpIU0w6MTAxNV8yMDIyMTEwN19UaV8yXzE1MjU=",
            "route": {
              "shortName": "15"
            }
          },
          "realtimeArrival": 55500,
          "arrivalDelay": 0
        }
      ]
    }
  }
};

const serverUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
const server = setupServer(
  rest.post(serverUrl, (req, res, ctx) => {
    return res(ctx.json(mockData))
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderList = () => (render(<Buses />));

describe('Buses.tsx', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should render page title', () => {
    renderList();

    const pgTitle = screen.getByTestId('page-title');
    expect(pgTitle).toBeTruthy();
    expect(pgTitle.textContent).toEqual('Buses ariving to');
  });

  test('should display loading state', () => {
    renderList();

    const msg = screen.getByTestId('loading-msg');
    expect(msg).toBeInTheDocument();
    expect(msg.textContent).toBe('Loading...');
  });

  test('should render error', async () => {
    server.use(
      rest.post(serverUrl, (req, res, ctx) => res(ctx.status(500))),
    );
    
    renderList();

    await waitFor(() => screen.findByTestId('buses-error'));
    const err = screen.queryByTestId('buses-error');
    expect(err).toBeInTheDocument();
  });

  test('should render buses list', async () => {
    renderList();

    await waitFor(() => screen.findByTestId('buses-list'));
    const list = screen.getByTestId('buses-list');
    expect(list).toBeInTheDocument();

    expect(list.childNodes.length).toBe(mockData.data.stop.stoptimesWithoutPatterns.length);
  });
});