import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomerStore from '../stores/customerStore';
import { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../apis/customerApi';
import type { Address } from '../types/customer';

type AddressForm = Omit<Address, 'id' | 'customer_id' | 'is_default'>;
const emptyForm: AddressForm = { name: '', address_line_1: '', address_line_2: '', landmark: '', pin: '', city: '', state: '', country: 'India' };

const ProfilePage = () => {
    const navigate = useNavigate();
    const { customer, isLoading, error, updateProfile, logout, clearError } = useCustomerStore();

    const [profileForm, setProfileForm] = useState({ name: customer?.name || '', phone: customer?.phone || '' });
    const [profileMsg, setProfileMsg] = useState('');

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addrLoading, setAddrLoading] = useState(false);
    const [showAddrForm, setShowAddrForm] = useState(false);
    const [editingAddr, setEditingAddr] = useState<Address | null>(null);
    const [addrForm, setAddrForm] = useState<AddressForm>(emptyForm);
    const [addrError, setAddrError] = useState('');

    useEffect(() => {
        if (customer) {
            setProfileForm({ name: customer.name, phone: customer.phone || '' });
            loadAddresses();
        }
    }, [customer]);

    const loadAddresses = async () => {
        setAddrLoading(true);
        try {
            const res = await getAddresses();
            if (res.success) setAddresses(res.data);
        } catch { /* ignore */ }
        setAddrLoading(false);
    };

    const handleProfileSave = async () => {
        clearError();
        setProfileMsg('');
        await updateProfile({ name: profileForm.name, phone: profileForm.phone || undefined });
        setProfileMsg('Profile updated!');
        setTimeout(() => setProfileMsg(''), 3000);
    };

    const openAddAddr = () => {
        setEditingAddr(null);
        setAddrForm(emptyForm);
        setAddrError('');
        setShowAddrForm(true);
    };

    const openEditAddr = (addr: Address) => {
        setEditingAddr(addr);
        setAddrForm({
            name: addr.name, address_line_1: addr.address_line_1,
            address_line_2: addr.address_line_2 || '', landmark: addr.landmark || '',
            pin: addr.pin, city: addr.city, state: addr.state, country: addr.country,
        });
        setAddrError('');
        setShowAddrForm(true);
    };

    const handleAddrSubmit = async () => {
        setAddrError('');
        const { name, address_line_1, pin, city, state, country } = addrForm;
        if (!name || !address_line_1 || !pin || !city || !state || !country) {
            setAddrError('Please fill all required fields');
            return;
        }
        try {
            if (editingAddr) {
                await updateAddress(editingAddr.id, addrForm);
            } else {
                await addAddress({ ...addrForm, is_default: false });
            }
            setShowAddrForm(false);
            await loadAddresses();
        } catch (err) {
            setAddrError(err instanceof Error ? err.message : 'Failed to save address');
        }
    };

    const handleDeleteAddr = async (id: number) => {
        if (!confirm('Delete this address?')) return;
        try {
            await deleteAddress(id);
            await loadAddresses();
        } catch { /* ignore */ }
    };

    const handleSetDefault = async (id: number) => {
        try {
            await setDefaultAddress(id);
            await loadAddresses();
        } catch { /* ignore */ }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!customer) return null;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 font-poppins">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

            {/* Profile section */}
            <section className="p-6 border border-gray-100 rounded-xl mb-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Personal Details</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}
                {profileMsg && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                        {profileMsg}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                            <input
                                type="tel"
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={customer.email}
                            disabled
                            className="w-full px-3 py-2.5 border border-gray-100 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleProfileSave}
                            disabled={isLoading}
                            className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">
                            Logout
                        </button>
                    </div>
                </div>
            </section>

            {/* Addresses section */}
            <section className="p-6 border border-gray-100 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-gray-900">Saved Addresses</h2>
                    {!showAddrForm && (
                        <button onClick={openAddAddr} className="text-sm text-gray-900 font-medium hover:underline">
                            + Add New
                        </button>
                    )}
                </div>

                {/* Address form */}
                {showAddrForm && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-3">
                        <p className="text-sm font-medium text-gray-700">{editingAddr ? 'Edit Address' : 'New Address'}</p>
                        {addrError && <p className="text-xs text-red-600">{addrError}</p>}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {([
                                ['name', 'Address Label *', 'text', 'Home / Office'],
                                ['address_line_1', 'Address Line 1 *', 'text', '123 Street Name'],
                                ['address_line_2', 'Address Line 2', 'text', 'Apt, Suite, etc.'],
                                ['landmark', 'Landmark', 'text', 'Near park'],
                                ['pin', 'PIN Code *', 'text', '400001'],
                                ['city', 'City *', 'text', 'Mumbai'],
                                ['state', 'State *', 'text', 'Maharashtra'],
                                ['country', 'Country *', 'text', 'India'],
                            ] as [keyof AddressForm, string, string, string][]).map(([field, label, type, placeholder]) => (
                                <div key={field}>
                                    <label className="block text-xs text-gray-500 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        value={addrForm[field] as string}
                                        onChange={(e) => setAddrForm(p => ({ ...p, [field]: e.target.value }))}
                                        placeholder={placeholder}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 pt-1">
                            <button onClick={handleAddrSubmit} className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700">
                                {editingAddr ? 'Update' : 'Save Address'}
                            </button>
                            <button onClick={() => setShowAddrForm(false)} className="px-4 py-2 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Address list */}
                {addrLoading ? (
                    <p className="text-sm text-gray-400">Loading addresses...</p>
                ) : addresses.length === 0 ? (
                    <p className="text-sm text-gray-400">No saved addresses yet.</p>
                ) : (
                    <div className="space-y-3">
                        {addresses.map((addr) => (
                            <div key={addr.id} className={`p-4 border rounded-xl ${addr.is_default ? 'border-gray-900' : 'border-gray-100'}`}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900">{addr.name}</p>
                                            {addr.is_default && (
                                                <span className="text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-full">Default</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {addr.address_line_1}
                                            {addr.address_line_2 && `, ${addr.address_line_2}`}
                                            {addr.landmark && `, Near ${addr.landmark}`}
                                        </p>
                                        <p className="text-xs text-gray-500">{addr.city}, {addr.state} – {addr.pin}</p>
                                        <p className="text-xs text-gray-500">{addr.country}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                        <button onClick={() => openEditAddr(addr)} className="text-xs text-gray-500 hover:text-gray-900">Edit</button>
                                        <button onClick={() => handleDeleteAddr(addr.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
                                        {!addr.is_default && (
                                            <button onClick={() => handleSetDefault(addr.id)} className="text-xs text-gray-400 hover:text-gray-900">Set Default</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProfilePage;
