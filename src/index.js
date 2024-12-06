import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Note from './Component/Note';
import DrawerAppBar from './Component/DrawerAppBar';
import NotFound from './Component/NotFound';
import Universe from './Component/Universe';
import CalendarSchedule from './Component/CalendarSchedule';
import Dashboard from './Component/Dashboard';
import MeetingRoom from './Component/MeetingRoom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DrawerAppBar />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/note',
        element: <Note />
      },
      {
        path: '/Universe',
        element: <Universe />
      },
      {
        path: '/MeetingRoom',
        element: <MeetingRoom />
      },
      {
        path: '/CalendarSchedule',
        element: <CalendarSchedule />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
