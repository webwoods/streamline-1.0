'use client'
import React, { DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface FileWithPreview extends File {
    preview: string;
}

const DropzoneCompoenent: React.FC<{ className?: string }> = ({ className }) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [rejected, setRejected] = useState<{ file: File; errors: any[] }[]>([]);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
        // Handle accepted files
        if (acceptedFiles.length) {
            // Filter out files that are already in the list
            const newFiles = acceptedFiles.filter(file => !files.find(existingFile => existingFile.name === file.name));

            setFiles(previousFiles => [
                ...previousFiles,
                ...newFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ) as FileWithPreview[]
            ]);
        }

        // Handle rejected files
        if (fileRejections.length) {
            setRejected(previousFiles => [
                ...previousFiles,
                ...fileRejections.map(({ file, errors }) => ({ file, errors }))
            ]);
        }
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true, // Allow multiple files to be dropped
        onDragEnter: () => { }, // Optional callback when a drag enters the drop zone
        onDragOver: () => { }, // Optional callback when a drag is over the drop zone
        onDragLeave: () => { } // Optional callback when a drag leaves the drop zone
    });

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeFile = (name: string) => {
        setFiles(files => files.filter(file => file.name !== name));
    };

    const removeAll = () => {
        setFiles([]);
        setRejected([]);
    };

    const removeRejected = (name: string) => {
        setRejected(files => files.filter(({ file }) => file.name !== name));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!files.length) return;

        const formData = new FormData();
        files.forEach(file => formData.append('file', file));
        formData.append('upload_preset', 'friendsbook');

        const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
        const data = await fetch(URL, {
            method: 'POST',
            body: formData
        }).then(res => res.json());

        console.log(data);
    };

    return (
        <div className='h-screen'>
            <form onSubmit={handleSubmit}>
                <section className='mt-10'>
                    <div className='flex gap-4 text-neutral-600 mt-10 border-b pb-3'>
                        <h2 className='title text-3xl font-semibold '>Upload Files</h2>
                        <button
                            type='button'
                            onClick={removeAll}
                            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                        >
                            Remove all files
                        </button>
                        <button
                            type='submit'
                            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
                        >
                            Upload to Cloudinary
                        </button>
                    </div>

                    {/* Drag and drop files */}
                    <div
                        {...getRootProps({
                            className: `${className} border border-gray-300 rounded-md p-8 text-center mt-20 w-[50%] mx-auto`
                        })}
                    >
                        <input {...getInputProps() as DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} />
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <ArrowUpTrayIcon className='w-5 h-5 fill-current' />
                            {isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <p>Drag & drop files here, or click to select files</p>
                            )}
                        </div>
                    </div>

                    {/* Accepted files */}
                    <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
                        Accepted Files
                    </h3>
                    <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
                        {files.map(file => (
                            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview);
                                    }}
                                    className='h-full w-full object-contain rounded-md'
                                />
                                <button
                                    type='button'
                                    className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                                    onClick={() => removeFile(file.name)}
                                >
                                    <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
                                </button>
                                <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                                    {file.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            </form>
        </div>
    );
};

export default DropzoneCompoenent;
