import type { DocumentData, DocumentReference } from 'firebase/firestore/lite';

/**
 * All docs should extend this base doc ref
 * When turning a fetched doc into data use the fromFirestore function
 */
export interface BaseDocRef {
  docRef: DocumentReference<DocumentData>;
}

export enum Role {
  ADMIN = 'admin',
}

/**
 * /roles/{doc}
 */
export interface UserRoleDoc extends BaseDocRef {
  roles: Role[];
}

/**
 * /siteconfigs/about/options/{option}
 */
export interface AboutOptionDoc extends BaseDocRef {
  label: string;
  content: string;
  order: number;
}

/**
 * /siteconfigs/experience
 */
export interface ExperienceDoc extends BaseDocRef {
  tech: Tech[];
}

export interface Tech {
  imgSrc: string;
  label: string;
}

/**
 * /siteconfigs/links
 */
export interface LinksDoc extends BaseDocRef {
  links: {
    link: string;
    label: string;
  }[];
}

/**
 * /siteconfigs/bellas
 */
export interface BellasDoc extends BaseDocRef {
  mys: string[];
}
