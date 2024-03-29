"use client"
import { IconChevronRight, IconFilter } from "@tabler/icons-react";
import Link from "next/link";

import React, { useState } from 'react';

const BreadCrumb = ({ page }: { page: string }) => {
  return (
    <section className="breadcrumnd__banner custom__space mr-24 ml-24">
      <div className="container-flud p-0">
        <ul className="breadcrund__content mb-40 d-flex gap-1 flex-wrap align-items-center">
          <li className="fs-16 bodyfont fw-500">
            <Link href="/home" style={{ color: 'white' }}>
              Home
            </Link>
          </li>
          <li>
            <IconChevronRight className="white" />
          </li>
          <li className="white fw-500 fs-16 bodyfont">{page}</li>
        </ul>
        <div className="header__text mb-30 d-flex justify-content-between align-items-center">
          <h2>{page}</h2>         
        </div>      
      </div>
    </section>
  );
};

export default BreadCrumb;
