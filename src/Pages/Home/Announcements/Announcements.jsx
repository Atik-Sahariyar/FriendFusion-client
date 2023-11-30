import { Helmet } from 'react-helmet-async';
import useAnnouncements from '../../../Hooks/useAnnouncements';

const Announcements = () => {
  const { announcements } = useAnnouncements();

  return (
   <div>
    <Helmet><title>FriendFusion | Announcements</title></Helmet>
     <div className="container mx-auto py-8">
      {announcements.length > 0 && (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">Announcements</h2>
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li key={announcement._id} className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                <p className="text-gray-600">{announcement.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
   </div>
  );
};

export default Announcements;
