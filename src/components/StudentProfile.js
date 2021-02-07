const StudentProfile = (props) => {
    const profile = props.profile[0];

    return (
        <div className="profile">
                <div className="profile-header">
                    <img src={profile.photo} alt="profile"/>
                    <p className="name">{profile.first_name} {profile.last_name}</p>
                </div>
                <div>
                    Telefoonnummer: {profile.phone} <br/>
                    Email: {profile.email} <br/> <br/>

                    Eindopdracht: {profile.quote}
                </div>
        </div>
    );
};

export default StudentProfile;
