import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import HeroEditor from '../components/admin/sections/HeroEditor';
import AboutEditor from '../components/admin/sections/AboutEditor';
import ProjectsEditor from '../components/admin/sections/ProjectsEditor';
import SkillsEditor from '../components/admin/sections/SkillsEditor';
import ExperienceEditor from '../components/admin/sections/ExperienceEditor';
import ContactEditor from '../components/admin/sections/ContactEditor';
import SettingsEditor from '../components/admin/sections/SettingsEditor';
import { useAuth } from '../context/AuthContext';

const AdminRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/hero" replace />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="projects" element={<ProjectsEditor />} />
        <Route path="skills" element={<SkillsEditor />} />
        <Route path="experience" element={<ExperienceEditor />} />
        <Route path="contact" element={<ContactEditor />} />
        <Route path="settings" element={<SettingsEditor />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 