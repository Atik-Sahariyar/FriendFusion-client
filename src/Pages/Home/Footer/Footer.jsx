
const Footer = () => {
  return (
    <footer className="bg-gray-800  text-gray-300 px-10">
      <div className="container mx-auto py-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <div className=" flex justify-center items-center">
          <img src="https://i.ibb.co/ydSCFSR/rsz-2firendfusion-logo2.jpg" alt="Website Logo" className="w-16 h-16 mb-2 rounded-tl-lg rounded-br-lg " />
          </div>
          <h2 className="text-2xl font-bold">FriendFusion Forum</h2>
          <p className="text-sm mt-2">Connecting People through Conversations</p>
        </div>
        <div className="text-sm">
          <p className="mb-2">Contact Us</p>
          <p className="mb-2">About Us</p>
          <p>Privacy Policy</p>
        </div>
        <div className="text-sm">
          <p className="mb-2">Terms of Service</p>
          <p className="mb-2">FAQ</p>
        </div>
        <div className="text-sm">
          <p className="mb-2">Developed by Atik Sahariyar</p>
          <p>© 2023 ForumName. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
