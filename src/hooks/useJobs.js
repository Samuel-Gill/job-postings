import { useCallback, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const jobsCollection = collection(db, 'jobs');

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(() => {
    setLoading(true);
    const jobsQuery = query(jobsCollection, orderBy('createdAt', 'desc'));
    return onSnapshot(
      jobsQuery,
      (snapshot) => {
        setJobs(snapshot.docs.map((jobDoc) => ({ id: jobDoc.id, ...jobDoc.data() })));
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError);
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => fetchJobs(), [fetchJobs]);

  const addJob = async (job, user) => {
    const payload = {
      ...job,
      status: 'active',
      userId: user.uid,
      postedBy: job.postedBy || user.displayName || user.email,
      email: job.email || user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    return addDoc(jobsCollection, payload);
  };

  const updateJob = async (id, updates) => {
    const jobRef = doc(db, 'jobs', id);
    return updateDoc(jobRef, { ...updates, updatedAt: serverTimestamp() });
  };

  const deleteJob = async (id) => deleteDoc(doc(db, 'jobs', id));

  return { jobs, loading, error, fetchJobs, addJob, updateJob, deleteJob };
}
