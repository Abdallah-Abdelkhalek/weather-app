'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button, Input } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { SearchIcon } from '../atoms/icons';

export default function SearchForm({
  defaultQuery = '',
}: {
  defaultQuery?: string;
}) {
  const [q, setQ] = useState(defaultQuery);
  const router = useRouter();
  const { t } = useTranslation();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/weather?city=${encodeURIComponent(q)}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={submit}
      className="flex w-full items-center gap-2"
    >
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('search_placeholder')}
        aria-label={t('search_city')}
        variant="bordered"
        radius="lg"
        classNames={{
          base: 'flex-1 text-lg',
          inputWrapper:
            'border-2 border-sky-300 dark:border-sky-500 hover:border-sky-400 dark:hover:border-sky-400 transition-colors duration-200 shadow-sm',
        }}
      />
      <Button
        type="submit"
        variant="shadow"
        radius="lg"
        className="flex items-center gap-2 bg-gradient-to-r from-sky-400 to-indigo-500 font-semibold text-white shadow-lg hover:from-sky-500 hover:to-indigo-600"
      >
        <SearchIcon size={18} />
        {t('search_button')}
      </Button>
    </motion.form>
  );
}
