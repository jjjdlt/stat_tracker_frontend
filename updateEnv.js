const fs = require('fs');
const os = require('os');
const path = require('path');

// Get the first non-internal IPv4 address, like 192.168.x.x
const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Check for IPv4 and ensure the interface is not internal (e.g., not 127.0.0.1)
            if (iface.family === 'IPv4' && !iface.internal) {
                if (iface.address.startsWith('192.168.')) { // Filter by 192.168.x.x range
                    return iface.address;
                }
            }
        }
    }
    return null;
};

// Path to the .env file
const envFilePath = path.resolve(__dirname, '.env');

// Function to update the .env file with the new IP
const updateEnvFile = (ipAddress) => {
    let envContent = '';

    if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, 'utf8');
    }

    const ipLine = `REACT_APP_HOST_IP=${ipAddress}`;

    // Check if REACT_APP_HOST_IP is already defined in the .env file
    const updatedEnvContent = envContent.includes('REACT_APP_HOST_IP')
        ? envContent.replace(/REACT_APP_HOST_IP=.*/, ipLine)
        : `${envContent}\n${ipLine}`;

    // Write the updated content back to the .env file
    fs.writeFileSync(envFilePath, updatedEnvContent, 'utf8');
};

// Fetch the IP and update the .env file
const ipAddress = getLocalIpAddress();

if (ipAddress) {
    updateEnvFile(ipAddress);
    console.log(`Updated REACT_APP_HOST_IP to ${ipAddress}`);
} else {
    console.error('Could not determine the local IP address');
}
